import React from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const AccordionItems: AccordionItem[] = [
  {
    id: "schemes",
    title: "Схемы объекта",
    content: (
      <ul className="list-reset">
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Общие данные</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/common_data_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/common_data_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Структурная схема</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Структурная схема</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Структурная схема</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Структурная схема</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Структурная схема</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Структурная схема</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/structural_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/structural_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
      </ul>
    ),
  },
  {
    id: "progs",
    title: "Программы",
    content: (
      <ul className="list-reset">
        <li className="modal__accordion-content-item">
          <div className="modal-content__link">Общие данные</div>
          <div className="modal-content__link-container">
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/common_data_sushilka.dwg"
              download
            >
              Скачать DWG
            </a>
            <a
              className="modal-content__link-download"
              href="/production/carbon/sushilki/modal-content/schemes/PDF/common_data_sushilka.pdf"
              download
            >
              Скачать PDF
            </a>
          </div>
        </li>
      </ul>
    ),
  }
];
