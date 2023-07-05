import { axios } from "@/libs/axios/axios";
import { authOptions } from "@/libs/nextauth/authoptions";
import { AxiosError } from "axios";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import chalk from "chalk";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const form = await request.formData();

  try {
    const { data, status } = await axios({
      url: "/F13/upload",
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "multipart/form-data",
      },
      data: form,
      method: "POST",
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
