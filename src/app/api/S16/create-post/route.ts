import { axios } from "@/libs/axios/axios";
import { authOptions } from "@/libs/nextauth/authoptions";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const form = await request.formData();

  try {
    const { data, status } = await axios.post("/posts", form, {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json({
      data,
      status,
    });
  } catch (error) {
    console.log({ error });

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
