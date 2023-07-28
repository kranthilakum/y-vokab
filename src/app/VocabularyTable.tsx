import React, { useEffect, useState, Suspense, SetStateAction } from "react";
import {
  Button,
  ButtonGroup,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  capitalize,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReadAloudButton from "./ReadAloud";
import LoadingIcon from "./LoadingIcon"; // Replace TableCellis wiTableCell your loading icon component
import basicSet from "../assets/basic.json";
import intermediateSet from "../assets/intermediate.json";

interface VocabularyObject {
  word: string;
  meaning: string;
  synonyms?: string[];
  antonyms?: string[];
  sentences?: string[];
}

interface VocabularyTableProps {
  selectedSet: string;
  searchTerm: string;
}

interface AlphabetIndexProps {
  selectedAlphabet: string;
  onAlphabetSelect: (alphabet: string) => void;
}

interface PageIndexProps {
  wordsCount: number;
  wordsPerPage: number;
  selectedPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const AlphabetIndex: React.FC<AlphabetIndexProps> = ({
  selectedAlphabet,
  onAlphabetSelect,
}) => {
  const alphabets: string[] = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  return (
    <div>
      {alphabets.map((alphabet) => (
        <Button
          key={alphabet}
          sx={{ mx: 0.5, my: 0.5 }}
          variant={selectedAlphabet === alphabet ? "contained" : "outlined"}
          onClick={() => onAlphabetSelect(alphabet)}
        >
          {alphabet}
        </Button>
      ))}
    </div>
  );
};

const PageIndex: React.FC<PageIndexProps> = ({
  wordsCount,
  wordsPerPage,
  selectedPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(wordsCount / wordsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="flex justify-center mt-4">
      <ButtonGroup
        variant="outlined"
        sx={{ my: 2 }}
        aria-label="outlined primary button group"
      >
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={selectedPage === pageNumber ? "contained" : "outlined"}
            className={`mx-1 px-3 py-1 rounded ${
              selectedPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

const VocabularyTable: React.FC<VocabularyTableProps> = ({
  selectedSet,
  searchTerm,
}) => {
  const [selectedAlphabet, setSelectedAlphabet] = useState("A");
  const [words, setWords] = useState<VocabularyObject[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const wordsCount: number = words.length;
  const wordsPerPage: number = 10;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  function reset() {
    setSelectedAlphabet("A");
    setCurrentPage(1);
  }

  useEffect(() => {
    const fetchVocabularyData = () => {
      try {
        let vocabularySet: VocabularyObject[] = [];

        // Load TableCell corresponding vocabulary set based on TableCelle selectedSet
        switch (selectedSet) {
          case "Basic":
            vocabularySet = basicSet;
            break;
          case "Intermediate":
            // Import and assign TableCell intermediate.json here (if you have it)
            vocabularySet = intermediateSet;
            break;
          // Add cases for TableCell sets as needed
          default:
            break;
        }

        let vocabularySetCopy = [...vocabularySet];

        const resultSet = vocabularySetCopy.filter((item) => {
          const wordItem = item.word.toUpperCase();
          return wordItem.startsWith(selectedAlphabet);
        });

        setWords(resultSet);

        if (searchTerm) {
          const filteredWords = resultSet.filter(
            (word) =>
              word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
              word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const sortedWords = filteredWords.sort((a, b) =>
            a.word.localeCompare(b.word)
          );

          setWords(sortedWords);
        }

        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading vocabulary set:", error);
      }
    };

    fetchVocabularyData();
  }, [selectedSet, searchTerm, selectedAlphabet]);

  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

  /**
   * Create a regular expression to match the word with word boundaries (\b)
   * Replace the matched word with an underlined version
   */
  const underlineWordInSentence = (word: string, sentence: string) => {
    const parts = sentence.split(new RegExp(`(\\b${word}\\b)`, "gi"));
    const underlinedSentence = parts.map((part, index) => {
      if (index % 2 === 1) {
        return <u key={index}>{part}</u>;
      }
      return part;
    });
    return <>{underlinedSentence}</>;
  }

  const renderWords = currentWords.map((wordObj) => (
    <TableRow key={wordObj.word}>
      <TableCell align="left">{capitalize(wordObj.word)}</TableCell>
      <TableCell align="left">{capitalize(wordObj.meaning)}</TableCell>
      <TableCell align="left">{wordObj.synonyms?.join(", ") || "-"}</TableCell>
      <TableCell align="left">{wordObj.antonyms?.join(", ") || "-"}</TableCell>
      <TableCell align="left">
        {wordObj.sentences?.map((sentence, index) => (
          <>{underlineWordInSentence(wordObj.word, sentence)}</>
        ))}
      </TableCell>
    </TableRow>
  ));

  const handleAlphabetSelect = (alphabet: string) => {
    setSelectedAlphabet(alphabet);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <AlphabetIndex
        selectedAlphabet={selectedAlphabet}
        onAlphabetSelect={handleAlphabetSelect}
      />

      <PageIndex
        wordsCount={wordsCount}
        wordsPerPage={wordsPerPage}
        selectedPage={currentPage}
        handlePageChange={handlePageChange}
      ></PageIndex>

      {matches ? (
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidTableCell: 650 }}
            aria-label="words table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Word</TableCell>
                <TableCell align="left">Meaning</TableCell>
                <TableCell align="left">Synonyms</TableCell>
                <TableCell align="left">Antonyms</TableCell>
                <TableCell align="left">Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderWords}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2}>
          {currentWords.map((wordObj) => (
            <Grid key={wordObj.word} item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    <strong>{capitalize(wordObj.word)}</strong>
                    <ReadAloudButton
                      enabled={true}
                      text={`${wordObj.word}. ${wordObj.meaning}.`}
                    />
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {wordObj.meaning}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {wordObj.sentences?.map((sentence, index) => (
                      <>{underlineWordInSentence(wordObj.word, sentence)}</>
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default VocabularyTable;
