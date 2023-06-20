import PropTypes from "prop-types";
import Select from "../Select";

import Button from "../Button";
import useContactForm from "./useContactForm";

import { forwardRef } from "react";

import FormGroup from "../FormGroup";
import { Form, ButtonContainer } from "./styles";

import Input from "../Input";

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
    const {
        handleSubmit,
        getErrorMessageByFieldName,
        name,
        handleNameChange,
        handleEmailChange,
        handlePhoneChange,
        isSubmitting,
        email,
        phone,
        isLoadingCategories,
        categoryId,
        categories,
        isFormValid,
        setCategoryId,
    } = useContactForm(onSubmit, ref);

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMessageByFieldName("name")}>
                <Input
                    error={getErrorMessageByFieldName("name")}
                    placeholder="Nome *"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup error={getErrorMessageByFieldName("email")}>
                <Input
                    type="email"
                    error={getErrorMessageByFieldName("email")}
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    maxLength="15"
                    placeholder="Telefone"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    disabled={isLoadingCategories || isSubmitting}
                >
                    <option value="">Sem categoria</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button
                    type="submit"
                    disabled={!isFormValid}
                    isLoading={isSubmitting}
                >
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
});

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
