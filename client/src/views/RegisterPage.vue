<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { RouterLink, useRouter } from "vue-router"
import { authApi } from "@/services/api/index"
import { useNotificationStore } from "@/stores/notificationStore"

import * as yup from "yup"
import cryptoRandomString from "crypto-random-string"

import { authBackground } from "@/assets/images"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { addErrorNotification, addSuccesNotification } = useNotificationStore()

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
const RegisterFormSubmit = async (values) => {
    const requestBody = {
        dartpointId: cryptoRandomString({ length: 8, type: "distinguishable" }),
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        country: "Belgium"
    }

    try {
        const { status, message, body } = await authApi.register(requestBody)

        if (status === 409) addErrorNotification({ message })

        if (status === 201) {
            addSuccesNotification({ message })
            setTimeout(() => router.push({ name: "LoginPage" }), 1000)
        }
    } catch (error) {
        addErrorNotification({ message: "Server is not responding" })
    }
}
</script>

<template>
    <div class="register-page">
        <BaseContainer class="register-page__form-container" :is-clickable="false">
            <h2>Register an account</h2>

            <Form
                id="register-form"
                class="register-page__form"
                @submit="RegisterFormSubmit"
                :validation-schema="registerFormValidationSchema"
                v-slot="{ isSubmitting }"
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
                        id="register-form-email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Type your email"
                    />

                    <BasePasswordInput
                        id="register-form-password"
                        name="password"
                        label="Password"
                        placeholder="Choose a password"
                    />

                    <BasePasswordInput
                        id="register-form-password-confirm"
                        name="confirmPassword"
                        label="Confirm password"
                        placeholder="Confirm your password"
                    />

                    <div class="register-page__link">
                        <p>Already have a dartpoint account?</p>

                        <RouterLink class="typo-body" :to="{ name: 'LoginPage' }">
                            Login
                        </RouterLink>
                    </div>
                </div>

                <BaseButton :disabled="isSubmitting">Register account</BaseButton>
            </Form>
        </BaseContainer>

        <img class="register-page__background" :src="authBackground" alt="page background" />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.register-page {
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

    &__link {
        display: flex;
        gap: var(--space-8);
        align-items: center;

        & > a {
            color: var(--clr-neutral-100);
            font-weight: var(--fw-500);
        }
    }

    &__form-container {
        grid-column: span 6;
        max-width: 50rem;

        @include styles-for(desktop) {
            grid-column: span 4;
        }
    }

    &__background {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        object-fit: cover;
        filter: brightness(0.8);
    }
}
</style>
