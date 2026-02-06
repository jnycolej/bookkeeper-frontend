import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { TVSHOW_DEFAULTS, REQUIRED_FIELDS } from "@/features/library/forms/tvShowDefaults";
import { formToTVShowPayload } from "../utils/tvShowMappers";

export function useTVShowForm(saveTVShow) {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [formData, setFormData] = useState(TVSHOW_DEFAULTS);

  const isValid = REQUIRED_FIELDS.every(
    (key) => String(formData[key] ?? "").trim() !== "",
  );

  const setField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "status" && value !== "watched" ? { dateFinished: "" } : {}),
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

  const payload = formToTVShowPayload(formData);   // ✅ define payload

  const saved = await saveTVShow(payload, token);

  if (reset) {
    setFormData(TVSHOW_DEFAULTS);
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
