import { Template, templates } from "@/lib/templates";

export default async function InvitationPage ({
    params
}: { params : { invitationId: string }}) {
    const data = {
        template: "example",
    }
    const Template = templates[data.template as Template] || templates.example;

    return <Template data={data}/>
}