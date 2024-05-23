import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { datePickerStyle } from "./DatePickerStyle";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerComp = ({ value, onChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const closeDatePicker = () => {
        setShowDatePicker(false);
    };
    return (
        <View>
            <View>
                <TouchableOpacity
                    style={datePickerStyle.textInput}
                    onPress={() => showDatepicker()}
                >
                    <Text style={datePickerStyle.textInputText}>
                        {new Date(value).toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <View>
                    <DateTimePicker
                        value={value}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        is24Hour={true}
                        maximumDate={new Date()}
                        onChange={onChange}
                    />
                    <TouchableOpacity
                        style={datePickerStyle.closeButton}
                        onPress={() => closeDatePicker()}
                    >
                        <Text style={datePickerStyle.closeButtonText}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default DatePickerComp;
