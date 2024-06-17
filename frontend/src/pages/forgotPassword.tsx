import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useFirebase } from '../context/firebase';
import Input from 'shared/Input/Input';
import ButtonPrimary from 'shared/Button/ButtonPrimary';

const ForgotPassword = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await firebase.sendPasswordResetEmail(email);
      setMessage('Password reset email sent. Please check your inbox.');
      setError('');
    } catch (error: any) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <div className="nc-ForgotPassword" data-nc-id="ForgotPassword">
      <Helmet>
        <title>Forgot Password || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleForgotPassword} className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <ButtonPrimary type="submit">Send Reset Email</ButtonPrimary>
          </form>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
