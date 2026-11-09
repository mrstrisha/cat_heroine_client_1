'use client';
// import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// import { Button } from "../../components/ui/button";
import { redirect } from "next/navigation";

const DeletePage = ({id}) => {
    const handleDeletePage = async()=>{
        const res = await fetch (`http://localhost:8000/eventDetail/${id}`,{
            method:"DELETE",
        });
        const data = await res.json();

        redirect('/managEvent');
    }
  return (
    <AlertDialog>
 <AlertDialogTrigger
  // render={
  //   <Button className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 shadow-sm transition-all duration-300">
  //     DELETE
  //   </Button>
  // }
>
  DELETE
</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeletePage}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeletePage;