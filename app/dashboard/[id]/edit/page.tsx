import { notFound } from "next/navigation";
import { getTodo } from "../actions";

export default async function TodoPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data, error } = await getTodo(id);
  if (error || data === null) notFound();
  return <h1>edit page</h1>;
}
