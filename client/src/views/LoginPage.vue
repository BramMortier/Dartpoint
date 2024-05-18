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
const loginFormValidationSchema = yup.object({
    email: yup.string().email("invalid email").required("an email is required!"),
    password: yup.string().required("a password is required required!")
})
// =============================================================================
// Functions
// =============================================================================
const handleLoginFormSubmit = async (values) => {
    const requestBody = {
        email: values.email,
        password: values.password
    }

    console.log(requestBody)

    const { status, message, body } = await authApi.login(requestBody)

    console.log(status, message, body)
}

const testLogout = async () => {
    const { status, message, body } = await authApi.logout()

    console.log(status, message, body)
}
</script>

<template>
    <div class="login-page">
        <BaseContainer class="login-page__form-container">
            <h2>Login</h2>

            <Form
                id="login-form"
                class="login-page__form"
                @submit="handleLoginFormSubmit"
                :validation-schema="loginFormValidationSchema"
            >
                <div class="login-page__form-fields">
                    <BaseInput
                        id="login-email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Type your email"
                    />

                    <BaseInput
                        id="login-password"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Choose a password"
                    />
                </div>

                <BaseButton>Login</BaseButton>
            </Form>
        </BaseContainer>
        <!-- <BaseButton @click="testLogout" class="base-button--secondary">Logout</BaseButton> -->
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.login-page {
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
