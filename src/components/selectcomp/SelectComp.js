import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { selectStyle } from "./SelectStyle";
import LabelComp from "../labelcomp/LabelComp";

const SelectComp = ({ label, options, selectedValues = [], onChange }) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleSelectItem = (item) => {
        const newSelectedValues = selectedValues.includes(item)
            ? selectedValues.filter((selected) => selected.value !== item.value)
            : [...selectedValues, item];

        onChange(newSelectedValues);
    };

    return (
        <View style={selectStyle.container}>
            {label && <LabelComp text={label} />}
            <Dropdown
                style={[
                    selectStyle.dropdown,
                    isFocus && { borderColor: "#11224D" },
                ]}
                placeholderStyle={selectStyle.placeholderStyle}
                selectedTextStyle={selectStyle.selectedTextStyle}
                inputSearchStyle={selectStyle.inputSearchStyle}
                iconStyle={selectStyle.iconStyle}
                data={options}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select options" : "..."}
                value={selectedValues}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleSelectItem}
                multiple={true}
                renderItem={(item) => (
                    <TouchableOpacity
                        style={selectStyle.item}
                        onPress={() => handleSelectItem(item)}
                    >
                        <Text
                            style={[
                                selectStyle.itemText,
                                selectedValues.some(
                                    (selected) => selected.value === item.value
                                ) && { color: "#193A6F" },
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
                renderSelectedItem={(selectedItem, unSelect) => (
                    <TouchableOpacity
                        key={selectedItem.value}
                        style={selectStyle.selectedItem}
                        onPress={() => unSelect(selectedItem)}
                    >
                        <Text style={selectStyle.selectedText}>
                            {selectedItem.label}
                        </Text>
                    </TouchableOpacity>
                )}
                containerStyle={selectStyle.dropdownContainer}
            />
        </View>
    );
};

export default SelectComp;
