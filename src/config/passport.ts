import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Users from '../models/user'; // your Sequelize user model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const name = profile.displayName;

        if (!email) {
          return done(new Error('No email found in Google profile'));
        }

        let user = await Users.findOne({ where: { email } });

        if (!user) {
          // Signup new user with Google data
          user = await Users.create({
            name,
            email,
            password: 'GOOGLE_OAUTH', // dummy password for google users
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Passport serialize/deserialize (required for session support)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
