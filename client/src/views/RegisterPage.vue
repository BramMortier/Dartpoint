<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { authApi } from "@/services/api/index"
import * as yup from "yup"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const registerFormValidationSchema = yup.object({
    displayName: yup.string().required("a display name is required!"),
    email: yup.string().email("invalid email").required("an email is required!"),
    password: yup
        .string()
        .min(6, "password is too short")
        .required("a password is required required!"),
    confirmPassword: yup
        .string()
        .required("this field can't be empty!")
        .oneOf([yup.ref("password")], "Passwords do not match")
})
// =============================================================================
// Functions
// =============================================================================
const handleRegisterFormSubmit = async (values) => {
    const requestBody = {
        displayName: values.displayName,
        email: values.email,
        password: values.password
    }

    const { status, message, body } = await authApi.register(requestBody)

    console.log(status, message, body)
}
</script>

<template>
    <div class="register-page">
        <BaseContainer class="register-page__form-container">
            <h2>Register an account</h2>

            <Form
                id="register-form"
                class="register-page__form"
                @submit="handleRegisterFormSubmit"
                :validation-schema="registerFormValidationSchema"
            >
                <div class="register-page__form-fields">
                    <BaseInput
                        id="register-display-name"
                        name="displayName"
                        label="Display name"
                        placeholder="Choose a display name"
                        hint="Your display name will show to other players online. You can always change it later."
                    />

                    <BaseInput
                        id="register-email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Type your email"
                    />

                    <BaseInput
                        id="register-password"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Choose a password"
                    />

                    <BaseInput
                        id="register-password-confirm"
                        name="confirmPassword"
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm your password"
                    />
                </div>

                <BaseButton>Register account</BaseButton>
            </Form>
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.register-page {
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    padding: var(--space-32);

    &__form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-48);
    }

    &__form-fields {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--space-24);
    }

    &__form-container {
        grid-column: span 6;
        max-width: 50rem;

        @include styles-for(desktop) {
            grid-column: span 4;
        }
    }
}
</style>
