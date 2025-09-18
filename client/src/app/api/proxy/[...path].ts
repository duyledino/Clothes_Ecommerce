// app/api/[...path]/route.ts
import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(req, params.path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(req, params.path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(req, params.path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(req, params.path);
}

// reusable proxy function
async function proxy(req: NextRequest, path: string[]) {
//   const targetUrl = `http://localhost:5000/api/v1/${path.join("/")}`;
//   try {
//     const response = await axios({
//       url: targetUrl,
//       method: req.method as any,
//       headers: {
//         ...Object.fromEntries(req.headers),
//         host: undefined, // avoid host header issues
//       },
//       data: ["POST", "PUT", "PATCH"].includes(req.method || "")
//         ? await req.json()
//         : undefined,
//       validateStatus: () => true, // allow non-2xx responses
//     });
//     console.log("in next server response.data: ",response.data);
//     // axios parsed it already -> convert to string for Next Response
//     return new Response(JSON.stringify(response.data), {
//       status: response.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err: any) {
//     return Response.json(
//       { error: "Proxy error", details: err.message },
//       { status: 500 }
//     );
//   }
}
