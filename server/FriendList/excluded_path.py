# import re


def custom_preprocessing_hook(endpoints):
    # filtered = []
    # for (path, path_regex, method, callback) in endpoints:
    #     if re.search("receiver", path) and method in ("PUT", "PATCH"):
    #         path = path.replace("receiver", "sender")
    #     filtered.append((path, path_regex, method, callback))
    return endpoints
