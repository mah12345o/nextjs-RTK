"use server";

import { cookies } from "next/headers";

export const settingSecureCookies = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const cookieStore = await cookies();

  cookieStore.set("email", email);
  // or
  cookieStore.set("passoword", password);
};
