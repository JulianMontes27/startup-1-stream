"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import axios from "axios";

import useModalStore from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

import qs from "query-string";
import { Button } from "@/components/ui/button";

//model the form values to get from the form
const formSchema = z.object({
  title: z.string().min(0).max(40),
  description: z.string().min(0).max(40),
  category: z.string().min(0).max(40),
  price: z.string().min(0).max(40),
  status: z.string().min(0).max(40),
  latitude: z.string().min(0).max(40),
  longitude: z.string().min(0).max(50),
});

const AddOrderModal = () => {
  const { isOpen, onClose, modalType } = useModalStore();
  const router = useRouter();
  const params = useParams();

  //get the offerer ID (user ID)
  if (!params) {
    router.push("/");
  }
  //default values from form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      status: "",
      latitude: "",
      longitude: "",
    },
  });
  //onsubmit hanlder
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: "/api/offer-service",
        query: {
          id: params?.userId,
        },
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
      toast.success("Servicio creado!", {
        position: "top-center",
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error creando tu Servicio.");
    }
  }
  return (
    <Dialog
      open={isOpen && modalType === "add-offered-service"}
      onOpenChange={onClose}
    >
      <DialogContent className="bg-white text-black sm:max-w-[425px] overflow-hidden rounded-md">
        <DialogHeader className="py-2 px-2">
          <DialogTitle className="font-semibold text-2xl">
            <p>Agregar Orden</p> <br />
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad de items</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="1"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es el numero de pedidos en la orden.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full transform transition-transform duration-300 ease-in-out hover:scale-105 px-4 py-2 rounded-md text-white mt-3"
                disabled={form.formState.isSubmitting}
              >
                Agregar servicio
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderModal;
