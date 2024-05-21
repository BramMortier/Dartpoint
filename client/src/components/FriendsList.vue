<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsListItem } from "@/components/index"
import { computed, ref } from "vue"

// =============================================================================
// Props & Events
// =============================================================================
const placeholderData = ref([
    { displayName: "Bram Mortier", isOnline: true, status: "In game" },
    { displayName: "Seppe Rogge", isOnline: true, status: "In Lobby" },
    { displayName: "Manu Van Leirberghe", isOnline: false, status: undefined },
    { displayName: "Karen Mortier", isOnline: false, status: undefined },
    { displayName: "Martina Maeyens", isOnline: true, status: "In game" },
    { displayName: "Fien Haelvoet", isOnline: false, status: undefined },
    { displayName: "Edward Maeyens", isOnline: true, status: "Chilling" }
])
// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const onlineFriends = computed(() => placeholderData.value.filter((user) => user.isOnline))

const offlineFriends = computed(() => placeholderData.value.filter((user) => !user.isOnline))

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="friends-list">
        <h2>Friends</h2>

        <div class="friends-list__online-group">
            <p class="typo-body-large">Online</p>

            <ul class="friends-list__online-group-list">
                <FriendsListItem v-for="user in onlineFriends" :user="user" />
            </ul>
        </div>

        <div class="friends-list__offline-group">
            <p class="typo-body-large">Offline</p>

            <ul class="friends-list__offline-group-list">
                <FriendsListItem v-for="user in offlineFriends" :user="user" />
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.friends-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);

    &__online-group,
    &__offline-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);

        @include styles-for(tablet) {
            gap: var(--space-16);
        }
    }

    &__online-group-list,
    &__offline-group-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-8);

        @include styles-for(tablet) {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-12);
        }

        @include styles-for(desktop) {
            display: flex;
            flex-direction: column;
            gap: var(--space-16);
        }
    }
}
</style>
