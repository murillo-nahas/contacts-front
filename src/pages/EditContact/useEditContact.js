import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import toast from "../../utils/toast";

import ContactsService from "../../services/ContactsService";

export default function useEditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState("");
    const contactFormRef = useRef(null);

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(id);

                contactFormRef.current.setFieldsValues(contact);
                setIsLoading(false);
                setContactName(contact.name);
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

    async function handleSubmit(contact) {
        try {
            const contactData = await ContactsService.updateContact(
                id,
                contact
            );

            setContactName(contactData.name);

            toast({
                type: "success",
                text: "Contato editar com sucesso!",
            });
        } catch {
            toast({
                type: "danger",
                text: "Ocorreu um erro ao editar o contato!",
            });
        }
    }

    return {
        isLoading,
        contactName,
        contactFormRef,
        handleSubmit,
    };
}
