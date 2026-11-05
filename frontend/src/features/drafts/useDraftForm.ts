import { useEffect, useState } from "react";
import type { FieldValues, UseFormReturn, DefaultValues } from "react-hook-form";
import { useDraftState } from "./useDraftState";

/** Los cambios de campos quedan guardados; restaurarlos nunca envía el formulario. */
export function useDraftForm<T extends FieldValues>(key: string, form: UseFormReturn<T>) {
  const [values, setValues] = useDraftState<DefaultValues<T>>(key, () => form.getValues() as DefaultValues<T>);
  const [restore, setRestore] = useState({ key, values });
  if (restore.key !== key) setRestore({ key, values });
  useEffect(() => { form.reset(restore.values); }, [form, restore]);
  useEffect(() => {
    const subscription = form.watch(next => setValues(next as DefaultValues<T>));
    return () => subscription.unsubscribe();
  }, [form, setValues]);
}
