import ChatWithOffererBtn from "@/components/main/chat-with-offerer-btn";
import getSession from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { getAddressFromCoordinates } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  //fetch the data of the service
  let disabled: boolean = false;
  const session = await getSession();
  if (!session?.user) {
    disabled = true;
    return redirect("/");
  }
  const serviceId = (await params).serviceId;
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
    include: {
      location: true,
    },
  });

  if (!service) {
    return <div>Service doesnt exist. Search for another one.</div>;
  }

  const { address } = await getAddressFromCoordinates(
    service.location?.latitude,
    service.location?.longitude
  );

  return (
    <div className="flex flex-col sm:p-3">
      <h1 className="text-center sm:font-bold sm:text-3xl">{service?.title}</h1>
      <h1>Price ($/hr): {service.price}</h1>
      <h1>Location:{address?.city}</h1>
      <div className="mt-3 w-full">
        <ChatWithOffererBtn offererId={service.offererId} disabled={disabled} />
      </div>
    </div>
  );
}
