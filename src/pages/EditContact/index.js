import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import toast from "../../utils/toast";

import Loader from "../../components/Loader";

import ContactsService from "../../services/ContactsService";

export default function EditContact() {
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

    async function handleSubmit(formData) {
        try {
            const contact = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                category_id: formData.categoryId,
            };
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

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader
                title={isLoading ? "Carregando..." : `Editar ${contactName}`}
            />
            <ContactForm
                ref={contactFormRef}
                buttonLabel="Salvar alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}
