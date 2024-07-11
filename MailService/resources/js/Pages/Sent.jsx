import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm } from "@inertiajs/react";


export default function Sent({ auth, mails, users, currentRoute }) {
    
    const { get, delete: destroy } = useForm({

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

        const url = route("delete_sender_mail") + '?' + param.toString();

        destroy(url);

    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            currentRoute = {currentRoute}
        >
            <Head title="Sent" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                {mails.map((mail, i) => (
                        <div className="bg-white hover:bg-gray-200 overflow-hidden shadow-sm sm:rounded-lg mt-4 flex p-6 text-gray-900" key={i} onClick={() => openMail(mail.id)}>
                            <div className='w-1/4'>
                                {i + 1}. Title: <b>{mail.title}</b> 
                            </div>
                            <div >
                                To: 
                                {users.map((user) => {
                                    if (user.id === mail.reciever_id) {
                                        return <b key={user.id}> {user.name}</b>;
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                            
                            <PrimaryButton className="ml-auto bg-red-500 hover:bg-red-600 " onClick={(e) => delete_mail(e, mail.id)}>Delete for me</PrimaryButton>
                            
                        </div>
                    ))}
                  
               
                </div>
            </div>

           
        </AuthenticatedLayout>
    );
}
