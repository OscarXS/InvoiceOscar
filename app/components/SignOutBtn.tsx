"use server"

import { signOut } from "../utils/auth"

export default async function SignOutBtn() {
    return (
        <form
        action={async () => {
            await signOut()
        }}
        >
        <button type="submit">Sign Out</button>
        </form>
    )
}