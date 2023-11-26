import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const FormModal = ({
  open,
  setOpen,
  title,
  subtitle,
  formData,
  setFormData,
  submitFormData,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-auto data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {title && (
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {title}
            </Dialog.Title>
          )}
          {subtitle && (
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              {subtitle}
            </Dialog.Description>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = {};
              formData.forEach((form) => {
                data[form.name] = form.value;
              });
              submitFormData(data);
            }}
          >
            {formData &&
              formData.map((data, index) => (
                <fieldset
                  key={data.id}
                  className="mb-[15px] flex items-center gap-5"
                >
                  <label
                    className="text-violet11 w-[150px] text-right text-[15px]"
                    htmlFor={data.id}
                  >
                    {data.label}
                  </label>
                  {data.type === "select" && (
                    <select
                      className="bg-white text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      id={data.id}
                      name={data.name}
                      defaultValue={data.value}
                      type={data.type}
                      placeholder={data.placeholder}
                      required={data.required}
                      onChange={(e) => {
                        const formDataCopy = [...formData];
                        formDataCopy[index].value = e.target.value;
                        setFormData(formDataCopy);
                      }}
                    >
                      {data.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {data.type === "text" && (
                    <input
                      className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      id={data.id}
                      name={data.name}
                      defaultValue={data.value}
                      type={data.type}
                      placeholder={data.placeholder}
                      required={data.required}
                      onChange={(e) => {
                        const formDataCopy = [...formData];
                        formDataCopy[index].value = e.target.value;
                        setFormData(formDataCopy);
                      }}
                    />
                  )}
                  {data.type === "image" && (
                    <div className="flex flex-col justify-center items-center w-full">
                      {data.value ? (
                        <div className="image-preview">
                          <img
                            className="w-[300px] aspect-video object-contain bg-gray-200 rounded-lg"
                            src={URL.createObjectURL(data.value)}
                            alt="Preview"
                          />
                        </div>
                      ) : (
                        <div className="rounded-lg font-bold text-6xl bg-gray-200 aspect-video flex items-center justify-center w-[300px]">
                          +
                        </div>
                      )}
                      <div className="font-light text-sm mt-2">
                        <span className="text-red-600">*</span>{" "}
                        {data.placeholder}
                      </div>
                      <label className="relative block">
                        <button className="mt-5 h-10 text-blue-600 border border-blue-600 px-6 rounded-md">
                          Upload
                        </button>
                        <input
                          className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          name={data.name}
                          onChange={(e) => {
                            const formDataCopy = [...formData];
                            formDataCopy[index].value = e.target.files[0];
                            setFormData(formDataCopy);
                          }}
                        />
                      </label>
                    </div>
                  )}
                </fieldset>
              ))}
            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormModal;
