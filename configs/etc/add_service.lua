function add_service_name(tag, timestamp, record)
    local filepath = record["filepath"]
    if filepath then
        if string.find(filepath, "backend1") then
            record["service"] = "backend1"
        elseif string.find(filepath, "backend2") then
            record["service"] = "backend2"
        else
            record["service"] = "unknown"
        end
    end
    return 1, timestamp, record
end