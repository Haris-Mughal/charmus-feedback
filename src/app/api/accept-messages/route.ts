import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found! Failed to update status",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Updated to accept messages status successfully",
        updatedUser,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("*---- Failed to update accept messages status", err);
    return Response.json(
      {
        success: false,
        message: "Failed to update accept messages status",
      },
      {
        status: 500,
      }
    );
  }
}
export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user;
  //   const user: User = session?.user as User

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
        message: "Updated to accept messages status successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("*---- Failed to get accept messages status", err);
    return Response.json(
      {
        success: false,
        message: "Failed to get accept messages status",
      },
      {
        status: 500,
      }
    );
  }
}
