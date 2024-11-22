"use client";

import { useState, useEffect } from "react";
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
  title: z.string().min(1, "Title is required").max(40),
  description: z.string().min(1, "Description is required").max(40),
  category: z.string().min(1, "Category is required").max(40),
  price: z.string().min(1, "Price is required").max(40),
  location: z.object({
    city: z.string().optional(),
  }),
});

const AddOrderModal = () => {
  const { isOpen, onClose, modalType } = useModalStore();
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    city: "",
  });
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    //ask for geolocation permissions at render
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
            city: "", //only if client's navigator doesnt return values
          });
        },
        (error) => {
          //ask for manual input of location
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  //get the offerer ID (user ID)
  if (!params) {
    return router.push("/");
  }

  //default values from form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      location: {
        city: "", //optional city (mandatory only if client doesnt choose )
      },
    },
  });
  //onsubmit hanlder
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: "/api/offer-service", //api url
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
      <DialogContent className="bg-white text-black sm:max-w-[425px] overflow-hidden rounded-md text-sm p-4">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            Crear Servicio{" "}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo del servicio</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="Carpinteria"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="Servicio de carpinteria exclusivo en Cartagena, Colombia."
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      {/* TODO: USER CAN CHOOSE FROM A LIST OF CATEGORIES */}
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="Mantenimiento y Mejoremiento de la Casa"
                        {...field}
                        disabled={form.formState.isSubmitting}
                        type="text"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio ($/hora)</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white focus:ring-0 text-black "
                        placeholder="100.000 COP"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2">
                <input
                  id="checked"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                />
                <label htmlFor="checked">Usar my ubicacion actual</label>
              </div>
              {!checked && (
                <FormField
                  control={form.control}
                  name="location.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicacion</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white focus:ring-0 text-black "
                          placeholder="Cartagena"
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
