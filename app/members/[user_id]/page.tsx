export default function Page({ params }: { params: { user_id: string } }) {
    return (
        <>
            <p>User ID: {params.user_id}</p>
        </>
    )
}
