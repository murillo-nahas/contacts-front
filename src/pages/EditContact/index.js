import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import toast from "../../utils/toast";

import Loader from "../../components/Loader";

import ContactsService from "../../services/ContactsService";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        async function loadContact() {
            try {
                await ContactsService.getContactById(id);

                setIsLoading(false);
            } catch {
                history.push("/");
                toast({
                    type: "danger",
                    text: "Contato não encontrado!",
                });
            }
        }

        loadContact();
    }, [id, history]);

    function handleSubmit() {
        console.log("oi");
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader title="Editar Murillo Nahás" />
            <ContactForm
                buttonLabel="Salvar alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}
