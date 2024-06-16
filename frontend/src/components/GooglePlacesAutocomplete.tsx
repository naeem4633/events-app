import React, { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

interface GooglePlacesAutocompleteProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onSelect: (address: string, coordinates?: { lat: number; lng: number }) => void;
  setSuggestions: (suggestions: { description: string }[]) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  inputRef,
  onSelect,
  setSuggestions,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
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
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  }, [status, data, setSuggestions]);

  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      onSelect(description, { lat, lng });
    });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  if (!ready) {
    return null;
  }

  return <div ref={ref}></div>;
};

export default GooglePlacesAutocomplete;
