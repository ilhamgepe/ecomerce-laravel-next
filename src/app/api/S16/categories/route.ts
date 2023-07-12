import { axios } from "@/libs/axios/axios";
import { authOptions } from "@/libs/nextauth/authoptions";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const { data, status } = await axios.get("/S16/posts/categories", {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    });
    return NextResponse.json(
      {
        ...data,
      },
      { status }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          error: error.response?.data,
        },
        {
          status: error.response?.status,
        }
      );
    }
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
