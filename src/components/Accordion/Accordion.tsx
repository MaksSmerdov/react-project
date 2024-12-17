import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider, // Импортируем Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordion.module.scss";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface DocumentationAccordionProps {
  items: AccordionItem[];
}

const DocumentationAccordion: React.FC<DocumentationAccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.accordionContainer}>
      {items.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <strong>{item.title}</strong>
          </AccordionSummary>
          {expanded === item.id && <Divider />}
          <AccordionDetails>
            {item.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DocumentationAccordion;
