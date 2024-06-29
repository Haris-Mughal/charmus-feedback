import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { messageid: string }
) {
  const messageId = params.messageid;
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
        status: 500,
      }
    );
  }

  try {
    const updatedUResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updatedUResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or Already deleted",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        messages: "Message Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("*---- Error deleting message", err);
    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      {
        status: 500,
      }
    );
  }
}
