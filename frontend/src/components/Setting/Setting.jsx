import React,{useRef} from 'react'
import '../../assets/css/setting.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Setting () {
    const form = useRef();

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(form.current);
    // emailjs.sendForm('service_5spjrhs', 'template_eraa8cd', form.current, '9jSPC6oxUGnG5oK8E')
    //     .then((result) => {
    //     toast.success("Email was sending succefully", toastOptions);
    //     }, (error) => {
    //     toast.error("There's an error in sending", toastOptions);
    //     });
    };
    return (
        <>
            <main>
                <div className="aboutus-holder"><br />
                    <h1>Paramètre :</h1><br />
                    <div className='description-holder'>
                        <div className='description'>
                            <h2>
                            N'hésitez pas à proposer vos idées !
                            </h2><br />
                            <p>Pour toute question ou demande d'informations, Veuillez nous contacter en utilisant ce formulaire</p><br />
                            <form ref={form} onSubmit={sendEmail} className='from-contact'>
                                <input type="text" name='name' placeholder="Svp donnez votre nom ...." required/>
                                <input type="email" name='email' placeholder="Votre email ...." required/>
                                <textarea type="message" name='msg' rows='7' placeholder="Votre message ...." required></textarea>
                                <button type='submit' className='btn-contact'>Envoyer Message</button>
                            </form>
                        </div>
                        <div className='logo'>
                            {/* <RealEarth /> */}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </main>
        </>
    )
}