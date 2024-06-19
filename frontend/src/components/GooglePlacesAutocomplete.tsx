import React, { useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useSearchContext } from "context/search"; // Import your SearchContext hook

interface GooglePlacesAutocompleteProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onSelect: (address: string, id: string) => void; // Update onSelect type to accept address and id
  setSuggestions: (suggestions: { description: string, place_id: string }[]) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  inputRef,
  onSelect,
  setSuggestions,
}) => {
  const { setLocation } = useSearchContext(); // Get setLocation from your context

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  useEffect(() => {
    if (inputRef.current) {
      const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
      };

      inputRef.current.addEventListener("input", handleInput);
      return () => inputRef.current?.removeEventListener("input", handleInput);
    }
  }, [inputRef, setValue]);

  useEffect(() => {
    if (status === "OK") {
      setSuggestions(data.map((suggestion) => ({ 
        description: suggestion.description,
        place_id: suggestion.place_id 
      })));
    } else {
      setSuggestions([]);
    }
  }, [status, data, setSuggestions]);

  const handleSelect = (suggestion: { description: string, place_id: string }) => () => {
    setValue(suggestion.description, false);
    clearSuggestions();
    onSelect(suggestion.description, suggestion.place_id); 

    // Optionally, update location in context if needed
    setLocation(suggestion.description);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <span
          onClick={handleSelect(suggestion)}
          key={place_id}
          className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
        >
        <span className="block text-neutral-400">
        </span>
        <span className="block font-medium text-neutral-700 dark:text-neutral-200">
        {main_text} {secondary_text}
        </span>
      </span>
      );
    });

  if (!ready) {
    return null;
  }

  return (
    <div ref={ref}>
    {data.length > 0 && (
      <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
        <ul>{renderSuggestions()}</ul>
      </div>
    )}
  </div>
  );
};

export default GooglePlacesAutocomplete;
