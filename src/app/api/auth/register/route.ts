import {UserRequest} from "@/server/entities";
import {registerUser} from "@/server/services/register";

export async function POST(req: Request) {
  const body: UserRequest = await req.json();

  return registerUser(body);
}
