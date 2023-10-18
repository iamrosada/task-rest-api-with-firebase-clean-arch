import { signInWithGoogleAuthCtrl } from "../auth-core";
import express, { Request, Response } from "express";

const handleSuccessResponse = (res: Response, message: string, data?: any) => {
  res.status(200).json({
    message,
    data,
  });
};

const handleErrorResponse = (res: Response, error: any) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

export const handlerLogInWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const response = await signInWithGoogleAuthCtrl.logInWithEmailAndPassword(req.body.email, req.body.password);

    // Set the Authorization header in the response
    res.setHeader("Authorization", response?.accessToken as any);
    res.writeHead(200,{'Form':'test@test.com'})
    // Set an HTTP-only cookie named "access_token"
    res.cookie("access_token", response?.accessToken, { httpOnly: true });

    handleSuccessResponse(res, "Login successful", response.accessToken);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};



export const handlerRegisterWithEmailAndPassword = async (req: Request, res: Response) => {
  console.info(req.body.email, req.body.password)
  try {
   const response = await signInWithGoogleAuthCtrl.registerWithEmailAndPassword(req.body.email, req.body.password);
    res.writeHead(200,{'Form':'test@test.com'})
  //  res.setHeader("Authorization", response?.accessToken as any);
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
