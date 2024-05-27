<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { authApi } from "@/services/api/index"
import { useRouter } from "vue-router"
import * as yup from "yup"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()

const loginFormValidationSchema = yup.object({
    email: yup.string().email("invalid email").required("an email is required!"),
    password: yup.string().required("a password is required required!")
})
// =============================================================================
// Functions
// =============================================================================
const LoginFormSubmit = async (values) => {
    const requestBody = {
        email: values.email,
        password: values.password
    }

    console.log(requestBody)

    const { status, message, body } = await authApi.login(requestBody)

    if (status === 200) setTimeout(() => router.push({ name: "DashboardPage" }), 1000)
}
</script>

<template>
    <div class="login-page">
        <BaseContainer class="login-page__form-container">
            <h2>Login</h2>

            <Form
                id="login-form"
                class="login-page__form"
                @submit="LoginFormSubmit"
                :validation-schema="loginFormValidationSchema"
            >
                <div class="login-page__form-fields">
                    <BaseInput
                        id="login-form-email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Type your email"
                    />

                    <BasePasswordInput
                        id="login-form-password"
                        name="password"
                        label="Password"
                        placeholder="Choose a password"
                    />
                </div>

                <BaseButton>Login</BaseButton>
            </Form>
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.login-page {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-16);

    @include styles-for(tablet) {
        grid-template-columns: repeat(12, 1fr);
        gap: var(--space-32);
    }

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
