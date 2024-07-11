import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm } from "@inertiajs/react";

export default function NewMail({ auth, mail_reply, mail_forward, currentRoute }) {
    
    const { post } = useForm({});

    const sendMail = () => {
        const param = new URLSearchParams();
        param.append('reciever_mail', document.getElementById('reciever_mail').value);
        param.append('title', document.getElementById('title').value);
        param.append('body', document.getElementById('body').value);
    
        const url = route("addmail") + '?' + param.toString();
        post(url);
    
        document.getElementById('reciever_mail').value = '';
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
    
        const message = document.createElement('div');
        message.style.color = 'darkblue';
        message.style.backgroundColor = 'lightgreen';
        message.style.borderRadius = '10px';
        message.style.padding = '10px';
        message.style.display = 'inline-block';
        message.style.marginLeft = '45%';
        message.textContent = 'Email sent successfully';
        
        const message1 = document.getElementById('gray');
        message1.insertAdjacentElement('beforebegin', message);
    
        setTimeout(() => {
            message.remove();
        }, 1000);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            currentRoute = {currentRoute}
        >
            <Head title="New Mail" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4 flex justify-center items-center" id='gray'>
                       
                        <div className="bg-gray-400 w-3/4 h-auto p-4 rounded-lg shadow-md m-6 " >
                        <form  onSubmit={(e) => {e.preventDefault(); sendMail();}}>
                                
                                <div className="mb-4 flex">
                                    
                                    <label htmlFor="reciever_mail">To:</label>
                                    <input type="email" id="reciever_mail" name="reciever_mail" value={mail_reply && mail_reply.sender_mail} onChange={(e) => setName(e.target.value)} required class='ml-24 rounded-lg' placeholder='E-mail'  />
                                    <div class='ml-8'>From: <b>{auth.user.email}</b></div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="title">Subject:</label>
                                    <input type="text" id="title" name="title" value={mail_reply ? 'reply on: ' + mail_reply.title : (mail_forward ? mail_forward.title : null)} onChange={(e) => setName(e.target.value)} required class='ml-14 rounded-lg' placeholder='Subject'/>
                                </div>
                                
                                    {mail_reply && (
                                        <div className="ml-28">
                                            On: <b>{mail_reply.created_at.slice(0, 10)}</b> at <b>{mail_reply.created_at.slice(11, 19)},  {mail_reply.sender_mail}</b> wrote: <br/>{mail_reply.body}
                                        </div>
                                    )}

                                <div className="mb-2">
                                    <label htmlFor="body" class="block">Message:</label>
                                    <textarea id="body" name="body" value={mail_forward && mail_forward.body} onChange={(e) => setName(e.target.value)} rows="4" cols="50" required class='ml-28 rounded-lg ' placeholder='Text'></textarea>
                                </div>
                                
                                <div class="mt-16 flex justify-end">
                                    <PrimaryButton type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
                                    {mail_forward && (
                                        <>Forward</>
                                    )}
                                    {mail_reply && (
                                        <>Reply</>
                                    )}
                                    {!mail_forward && !mail_reply && (
                                         <>Send mail</>
                                    )}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div> 
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
