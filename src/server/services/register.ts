import {STATUS_CODES} from "http";

import {NextResponse} from "next/server";

import {UserRequest} from "../entities";
import {encryptPassword} from "../utils";
import {prisma} from "../db";

export async function registerUser(userReq: UserRequest) {
  try {
    const userData = await normalizedUser(userReq);

    const userId = await prisma.user.create({
      data: userData,
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      {
        status: STATUS_CODES.OK,
        data: userId,
      },
      {status: 201},
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: STATUS_CODES.BAD_REQUEST,
        error: "Something went wrong",
      },
      {status: 500},
    );
  }
}

async function normalizedUser(user: UserRequest) {
  const {username, password} = user;

  const hashedPassword = await encryptPassword(password);

  return {
    username,
    password: hashedPassword,
  };
}
