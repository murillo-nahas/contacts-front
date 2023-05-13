import PropTypes from "prop-types";

import { useState, useRef } from "react";

import FormGroup from "../FormGroup";
import { Form, ButtonContainer } from "./styles";

import Input from "../Input";

import Select from "../Select";

import Button from "../Button";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");

    const emailInput = useRef(null);

    return (
        <Form>
            <FormGroup>
                <Input
                    value={name}
                    placeholder="Nome"
                    onChange={(event) => setName(event.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Input placeholder="E-mail" ref={emailInput} />
            </FormGroup>

            <FormGroup>
                <Input placeholder="Telefone" />
            </FormGroup>

            <FormGroup>
                <Select>
                    <option value="instagram">Instagram</option>
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button type="submit">{buttonLabel}</Button>
            </ButtonContainer>
        </Form>
    );
}

ContactForm.propTypes = {
    buttonlabel: PropTypes.string.isRequired,
};
