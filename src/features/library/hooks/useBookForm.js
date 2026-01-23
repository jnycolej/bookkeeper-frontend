import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BOOK_INITIAL_STATE, REQUIRED_FIELDS } from "../forms/bookDefaults";
import { formToBookPayload } from "../utils/bookMappers";

export function useBookForm(onSubmit, initialData) {
    const { getAccessTokenSilently } = useAuth0();
    const [formData, setFormData] = useState(initialData ?? BOOK_INITIAL_STATE);

  const isValid = REQUIRED_FIELDS.every(
    (key) => String(formData[key] ?? "").trim() !== ""
  );

  const setField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "status" && value !== "read"
        ? { dateFinished: "" }
        : {}),
    }));
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setField(id, type === "checkbox" ? checked : value);
  };

  const submit = async ({ reset = false } = {}) => {
    const payload = formToBookPayload(formData);

    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "read:books write:books",
      },
      prompt: "consent",
    });
await onSubmit(payload, token);

    if (reset) setFormData(BOOK_INITIAL_STATE);
  };

  return {
    formData,
    setFormData,
    setField,
    handleChange,
    isValid,
    submit,
  };
}