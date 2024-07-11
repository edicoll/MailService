import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function OpenMail({ auth, mail, inbox_or_sent }) {

    const { get } = useForm({
    });

    const reply = (mail_id) => {

       const param = new URLSearchParams();
       param.append('id', mail_id);

       const url = route("reply") + '?' + param.toString();
        get(url);
    }

    const forward = (mail_id) => {

        const param = new URLSearchParams();
        param.append('id', mail_id);
 
        const url = route("forward") + '?' + param.toString();
         get(url);
     }


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="OpenMail" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden h-72 shadow-sm sm:rounded-lg mt-4 relative ">
                                <div className="border border-gray-400 rounded p-2 mt-1 ml-2 w-fit"><b>{mail.title}</b></div>

                                <div className="border border-gray-400 rounded p-2 mt-4 ml-2 w-fit"><b>{mail.sender_mail}</b></div>
                                    <hr className="my-2 border-t border-gray-600 w-5/6 mx-auto mt-6"></hr> 

                                <div className=" rounded p-2 mt-8 ml-2 ">{mail.body}</div>
                                {inbox_or_sent && (
                                    <div>
                                        <PrimaryButton className="absolute bottom-2 right-24 bg-yellow-500 hover:bg-yellow-600" onClick={() => forward(mail.id)} >Forward</PrimaryButton>
                                        <PrimaryButton className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600" onClick={() => reply(mail.id)} >Reply</PrimaryButton>
                                    </div>
                                )}

                    </div> 
                </div>
            </div>
        </AuthenticatedLayout>
    );
}