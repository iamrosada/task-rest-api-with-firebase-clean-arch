import { signInWithGoogleAuthCtrl } from "../auth-core";
import express, { Request, Response } from "express";

const handleSuccessResponse = (res: Response, message: string, data?: any) => {
  res.status(200).json({
    message,
    data,
  });
};

function writeCustomError(message) {
  var errorObject:any = {};
  errorObject.message = message;
  errorObject.code = 10001; // as you want
  errorObject.status = "failed";
  return errorObject;
  }
const handleErrorResponse = (res: Response, error: any) => {
  console.error("Error:", error);

  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (error.code === "auth/user-not-found") {
    statusCode = 404;
    errorMessage = "User not found";
  } else if (error.code === "auth/wrong-password") {
    statusCode = 401;
    errorMessage = "Incorrect password";
  } else if (error.code === "auth/weak-password") {
    statusCode = 400;
    errorMessage = "Weak password: The password must be at least 6 characters.";
  } else if (error.code === "auth/email-already-in-use") {
    statusCode = 409;
    errorMessage = "Email already in use: The provided email is already registered.";
  } else if (error.code === "auth/invalid-email") {
    statusCode = 400;
    errorMessage = "Invalid email: The provided email is not valid.";
  }
  res.status(statusCode).json({ error: errorMessage });
};

export const handlerLogInWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const response = await signInWithGoogleAuthCtrl.logInWithEmailAndPassword(req.body.email, req.body.password);

    res.setHeader("Authorization", response?.accessToken as any);
    
    res.cookie("access_token", response?.accessToken, { httpOnly: true });

    handleSuccessResponse(res, "Login successful", response.accessToken);
  } catch (error) {
    var err = writeCustomError(error.message || error.errmsg || error.stack);
    console.info(err?.message,"vvvvv")
    res.status(417).json(err).end();
  }
};

export const handlerRegisterWithEmailAndPassword = async (req: Request, res: Response) => {
  console.info(req.body.email, req.body.password);

  try {
    const response = await signInWithGoogleAuthCtrl.registerWithEmailAndPassword(req.body.email, req.body.password);
     res.setHeader("Authorization", response?.accessToken as any);
    res.cookie("access_token", response?.accessToken, { httpOnly: true }); // Replace "access_token" with your desired cookie name

    handleSuccessResponse(res, "Registration successful", response.accessToken);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


export const handlerSignInWithGoogle = async (req: Request, res: Response) => {
  try {
    await signInWithGoogleAuthCtrl.signInWithGoogle();
    handleSuccessResponse(res, "Google Sign-In successful");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const handlerSendPasswordReset = async (req: Request, res: Response) => {
  try {
    await signInWithGoogleAuthCtrl.sendPasswordReset(req.body.email);
    handleSuccessResponse(res, "Password reset email sent successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const handlerLogout = async (req: Request, res: Response) => {
  try {
    await signInWithGoogleAuthCtrl.logout();
    handleSuccessResponse(res, "Logout successful");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
