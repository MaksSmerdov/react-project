import React from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

const accordionData = {
  schemes: [
    {
      name: "Общие данные",
      files: [
        {
          type: "DWG",
          href: "/production/carbon/sushilki/modal-content/schemes/common_data_sushilka.dwg",
        },
        {
          type: "PDF",
          href: "/production/carbon/sushilki/modal-content/schemes/PDF/common_data_sushilka.pdf",
        },
      ],
    },
    {
      name: "Структурная схема",
      files: [
        {
          type: "DWG",
          href: "/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg",
        },
        {
          type: "PDF",
          href: "/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf",
        },
      ],
    },
  ],

};

export const AccordionItems: AccordionItem[] = Object.entries(accordionData).map(
  ([key, items]) => ({
    id: key,
    title: key === "schemes" ? "Схемы объекта" : "Программы",
    content: (
      <ul className="list-reset">
        {items.map((item, index) => (
          <li className="modal__accordion-content-item" key={index}>
            <div className="modal-content__link">{item.name}</div>
            <div className="modal-content__link-container">
              {item.files.map((file, fileIndex) => (
                <a
                  className="modal-content__link-download"
                  href={file.href}
                  key={fileIndex}
                  download
                >
                  Скачать {file.type}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    ),
  })
);
