import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { checkableListStyle } from "./CheckableListStyle";

const CheckableListComp = ({ items, selectedIds, onSelectItem }) => {
    /*const [selectedIds, setSelectedIds] = useState(new Set());

    // Handle check/uncheck
    const handleSelectItem = (id) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };*/

    // Render item
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                checkableListStyle.item,
                {
                    backgroundColor: selectedIds.has(item.id)
                        ? "#d1e7dd"
                        : "#fff",
                },
            ]}
            onPress={() => onSelectItem(item.id)}
        >
            <Text style={checkableListStyle.title}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedIds}
        />
    );
};

export default CheckableListComp;
