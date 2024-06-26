// "use client";
// import React, { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, useForm } from "react-hook-form";
// import * as z from "zod";
// import { useDebounceCallback } from "usehooks-ts";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import { SignUpSchema } from "@/schemas/signUpSchema";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const Page = () => {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const debounced = useDebounceCallback(setUsername, 300);
//   const { toast } = useToast();
//   const router = useRouter();

//   const form = useForm<z.infer<typeof SignUpSchema>>({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (username) {
//         setIsCheckingUsername(true);
//         setUsernameMessage("");

//         try {
//           const response = await axios.get(
//             `/api/unique-username?username=${username}`
//           );
//           console.log("*---- Response signup wla", response.data.message);
//           // let message = response.data.message;
//           // setUsernameMessage(message);
//           setUsernameMessage(response.data.message);
//         } catch (error) {
//           console.error("*---- Error checking username", error);
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message ?? "Error checking username"
//           );
//         } finally {
//           setIsCheckingUsername(false);
//         }
//       }
//     };
//     checkUsernameUnique();
//   }, [username]);

//   const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post<ApiResponse>(`/api/signup`, data);
//       toast({
//         title: "success",
//         description: response.data.message,
//         duration: 3000,
//       });

//       router.replace(`/verify-code/${username}`);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.error("*---- Signup failed", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message;
//       toast({
//         title: "Signup failed",
//         description: errorMessage,
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-">
//             Join Charmus Message
//           </h1>
//           <p className="my-4">Sign up to start your anonymous adventure</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* <div className="my-2">
//               <input
//                 title="Username"
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 form-control
//                 onChange={(e) => {
//                   debounced(e.target.value);
//                 }}
//               />
//               <p
//                 className={`text-sm ${
//                   usernameMessage === "Username available"
//                     ? "text-green-500"
//                     : "text-red-500"
//                 }`}
//               >
//                 test {usernameMessage}
//               </p>
//             </div>
//             <input
//               title="Email"
//               type="email"
//               name="email"
//               placeholder="Email"
//               form-control
//             />
//             <input
//               title="Password"
//               type="password"
//               name="password"
//               placeholder="Password"
//               form-control
//             />
//             <br /> */}
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="username"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e);
//                         debounced(e.target.value);
//                       }}
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     <p
//                       className={`text-sm ${
//                         usernameMessage === "Username available"
//                           ? "text-green-500"
//                           : "text-red-500"
//                       }`}
//                     >
//                       {isCheckingUsername && (
//                         <Loader2 className="animate-spin" />
//                       )}{" "}
//                       test {usernameMessage}
//                     </p>
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="email" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     Your email should like `email@gmail.com`.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="password" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     Your password should be at least 6 characters.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               // className="mx-auto w-full bg-black text-white rounded py-2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait...
//                 </>
//               ) : (
//                 "Signup"
//               )}
//             </Button>
//             {/* <button
//               type="submit"
//               className="mx-auto w-full bg-black text-white rounded py-2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait...
//                 </>
//               ) : (
//                 "Signup"
//               )}
//             </button> */}
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Already have an account?{" "}
//             <Link href="/signin" className="text-blue-600 hover:text-blue-800">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback((value) => setUsername(value), 300);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get(
            `/api/unique-username?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          console.error("Error checking username", error);
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>(`/api/signup`, data);
      toast({
        title: "Success",
        description: response.data.message,
        duration: 3000,
      });

      router.replace(`/verify-code/${data.username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Signup failed", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            Join Charmus Message
          </h1>
          <p className="my-4">Sign up to start your anonymous adventure</p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription
                    className={`text-sm ${
                      usernameMessage === "Username available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {isCheckingUsername && <Loader2 className="animate-spin" />}{" "}
                    {usernameMessage}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your email should look like `email@gmail.com`.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your password should be at least 6 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </FormProvider>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
