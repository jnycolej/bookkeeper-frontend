import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { VIDEOGAME_DEFAULTS, REQUIRED_FIELDS } from "@/features/library/forms/videoGameDefaults";
import { formToVideoGamePayload } from "@/features/library/utils/videoGameMappers";

export function useVideoGameForm(saveVideoGame) {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [formData, setFormData] = useState(VIDEOGAME_DEFAULTS);

  const isValid = REQUIRED_FIELDS.every(
    (key) => String(formData[key] ?? "").trim() !== "",
  );

  const setField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "status" && value !== "completed" ? { dateFinished: "" } : {}),
    }));
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setField(id, type === "checkbox" ? checked : value);
  };

const submit = async ({ reset } = {}) => {
  if (isLoading) return;

  if (!isAuthenticated) {
    await loginWithRedirect();
    throw new Error("Not authenticated");
  }

  const token = await getAccessTokenSilently();

  const payload = formToVideoGamePayload(formData);   // ✅ define payload

  const saved = await saveVideoGame(payload, token);

  if (reset) {
    setFormData(VIDEOGAME_DEFAULTS);
  }

  return saved;
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
