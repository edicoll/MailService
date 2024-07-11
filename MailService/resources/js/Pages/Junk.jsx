import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Junk({ auth, mails, currentRoute}) {

    const {delete: destroy, get} = useForm({

    });

    const openMail = (mail_id) => {


        const param = new URLSearchParams();
        param.append('id', mail_id);

        const url = route("open_mail_sent") + '?' + param.toString();

        get(url);

    }

    const delete_mail = (e, mail_id) => {

        e.preventDefault();
        e.stopPropagation();

        const param = new URLSearchParams();
        param.append('mailId', mail_id);

        const url = route("delete_from_junk") + '?' + param.toString();
        destroy(url);
    }

    const not_junk = (e, mail_id) => {

        e.preventDefault();
        e.stopPropagation();

        const param = new URLSearchParams();
        param.append('mailId', mail_id);

        const url = route("not_junk") + '?' + param.toString();
        get(url);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            currentRoute = {currentRoute}
        >
            <Head title="Junk" />

            <div className="py-12">
                
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {mails.map((mail, i) =>(
                    <div className="bg-white  hover:bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg mt-4 flex p-6 text-gray-900" key={i} onClick={() => openMail(mail.id)}>
                        <div className='w-1/4 '>{i+1}. Sender: <b>{mail.sender_mail}</b></div> <div>Title: <b>{mail.title}</b> </div>
                
                            <div className='ml-auto flex'>
                                 <PrimaryButton className="ml-auto bg-green-400 hover:bg-green-600 " onClick={(e) => not_junk(e, mail.id)} >Move to inbox</PrimaryButton>
                                 <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-600 " onClick={(e) => delete_mail(e, mail.id)} >Delete</PrimaryButton>
                        </div>
                    </div> 

                ))}


                </div>
            </div>

           
        </AuthenticatedLayout>
    );
}